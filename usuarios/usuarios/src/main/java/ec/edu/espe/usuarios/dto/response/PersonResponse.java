package ec.edu.espe.usuarios.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@Schema(description = "Respuesta con los datos personales de una persona")
public class PersonResponse {

    @Schema(
            description = "ID único de la persona",
            example = "550e8400-e29b-41d4-a716-446655440001"
    )
    private UUID id;

    @Schema(
            description = "Cédula o DNI de la persona",
            example = "1723456789"
    )
    private String dni;

    @Schema(
            description = "Primer nombre de la persona",
            example = "Lizeth"
    )
    private String firstName;

    @Schema(
            description = "Segundo nombre de la persona",
            example = "Marisol"
    )
    private String middleName;

    @Schema(
            description = "Apellido de la persona",
            example = "Quimi"
    )
    private String lastName;

    @Schema(
            description = "Correo electrónico de la persona",
            example = "lizeth@email.com"
    )
    private String email;

    @Schema(
            description = "Número de teléfono de la persona",
            example = "0999999999"
    )
    private String phone;

    @Schema(
            description = "Dirección de la persona",
            example = "Guayaquil"
    )
    private String address;

    @Schema(
            description = "Nacionalidad de la persona",
            example = "Ecuatoriana"
    )
    private String nationality;

    @Schema(
            description = "Estado de la persona",
            example = "true"
    )
    private Boolean active;
}