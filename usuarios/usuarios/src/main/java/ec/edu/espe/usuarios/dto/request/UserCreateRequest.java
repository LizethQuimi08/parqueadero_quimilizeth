package ec.edu.espe.usuarios.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Datos requeridos para crear un usuario")
public class UserCreateRequest {

    @Schema(
            description = "Cédula o DNI del usuario",
            example = "1723456789",
            maxLength = 10,
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "DNI is required")
    @Size(max = 10, message = "DNI must be at most 10 characters")
    @Pattern(regexp = "^[0-9]+$", message = "DNI must contain only digits")
    private String dni;

    @Schema(
            description = "Primer nombre del usuario",
            example = "Lizeth",
            maxLength = 25,
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Firstname is required")
    @Size(max = 25, message = "Firstname must be at most 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Firstname must contain only letters")
    private String firstName;

    @Schema(
            description = "Segundo nombre del usuario",
            example = "Marisol",
            requiredMode = Schema.RequiredMode.NOT_REQUIRED
    )
    private String middleName;

    @Schema(
            description = "Apellido del usuario",
            example = "Quimi",
            maxLength = 25,
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Lastname is required")
    @Size(max = 25, message = "Lastname must be at most 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Lastname must contain only letters")
    private String lastName;

    @Schema(
            description = "Correo electrónico del usuario",
            example = "lizeth@email.com",
            maxLength = 25,
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Email is required")
    @Size(max = 25, message = "Email must be at most 25 characters")
    @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            message = "Email must be a valid email address"
    )
    private String email;

    @Schema(
            description = "Número de teléfono del usuario",
            example = "0999999999",
            requiredMode = Schema.RequiredMode.NOT_REQUIRED
    )
    @Pattern(regexp = "^[0-9]+$", message = "Phone must contain only digits")
    private String phone;

    @Schema(
            description = "Dirección del usuario",
            example = "Guayaquil",
            requiredMode = Schema.RequiredMode.NOT_REQUIRED
    )
    private String address;

    @Schema(
            description = "Nacionalidad del usuario",
            example = "Ecuatoriana",
            requiredMode = Schema.RequiredMode.NOT_REQUIRED
    )
    private String nationality;
}