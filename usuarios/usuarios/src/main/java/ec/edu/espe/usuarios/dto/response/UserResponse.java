package ec.edu.espe.usuarios.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@Schema(description = "Respuesta con la información del usuario registrado")
public class UserResponse {

    @Schema(
            description = "ID único del usuario",
            example = "550e8400-e29b-41d4-a716-446655440000"
    )
    private UUID id;

    @Schema(
            description = "Nombre de usuario generado o asignado",
            example = "lquimi"
    )
    private String username;

    @Schema(
            description = "Estado del usuario",
            example = "true"
    )
    private Boolean active;

    @Schema(
            description = "Fecha y hora del último inicio de sesión",
            example = "2026-06-16T20:30:00"
    )
    private LocalDateTime lastLogin;

    @Schema(
            description = "Fecha y hora de creación del usuario",
            example = "2026-06-16T20:00:00"
    )
    private LocalDateTime createdAt;

    @Schema(
            description = "Datos personales asociados al usuario"
    )
    private PersonResponse person;
}