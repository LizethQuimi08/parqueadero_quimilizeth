package ec.edu.espe.usuarios.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI usuariosOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Microservicio de Usuarios")
                        .description("Documentación de la API para la gestión de usuarios, personas y roles.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("ESPE")
                                .email("soporte@espe.edu.ec"))
                        .license(new License()
                                .name("Uso académico")));
    }
}