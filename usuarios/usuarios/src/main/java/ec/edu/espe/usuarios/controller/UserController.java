package ec.edu.espe.usuarios.controller;

import ec.edu.espe.usuarios.dto.request.UserCreateRequest;
import ec.edu.espe.usuarios.dto.response.UserResponse;
import ec.edu.espe.usuarios.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Usuarios", description = "Endpoints para la gestión de usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(
            summary = "Listar usuarios",
            description = "Obtiene todos los usuarios registrados en la base de datos."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida correctamente")
    })
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/dni/{dni}")
    @Operation(
            summary = "Buscar usuario por DNI",
            description = "Busca un usuario registrado usando el DNI de la persona asociada. Este endpoint es usado por el microservicio de Tickets para validar al usuario."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario encontrado correctamente"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado con el DNI indicado")
    })
    public ResponseEntity<UserResponse> getUserByDni(
            @Parameter(description = "DNI o cédula de la persona", example = "1723456789")
            @PathVariable String dni
    ) {
        return ResponseEntity.ok(userService.getUserByDni(dni));
    }

    @PostMapping
    @Operation(
            summary = "Crear usuario",
            description = "Crea un nuevo usuario con sus datos personales y lo registra en la base de datos."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuario creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "409", description = "El usuario ya existe")
    })
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody UserCreateRequest request
    ) {
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{userId}/roles/{roleId}")
    @Operation(
            summary = "Asignar rol a usuario",
            description = "Asigna un rol existente a un usuario registrado."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Rol asignado correctamente"),
            @ApiResponse(responseCode = "404", description = "Usuario o rol no encontrado")
    })
    public ResponseEntity<UserResponse> assigneRoleUser(
            @Parameter(description = "ID del usuario", example = "550e8400-e29b-41d4-a716-446655440000")
            @PathVariable UUID userId,

            @Parameter(description = "ID del rol", example = "550e8400-e29b-41d4-a716-446655440001")
            @PathVariable UUID roleId
    ) {
        return ResponseEntity.ok(userService.assigneRole(userId, roleId));
    }
}