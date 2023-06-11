import { APP_GUARD } from "@nestjs/core";
import { AWSGuard } from "./aws.guard";


// ### Init guard to all the available route through out the application by injecting into any of the one module
/* Note: If we use GlobalGuard decorator then not required to add indivually to route by adding below decarators
    @UseGuards(LocalAuthGuard)
    @UseGuards(JwtAuthGuard)
    @UseGuards(AWSGuard)
*/
export const GlobalGuard = {
    provide: APP_GUARD,
    useClass: AWSGuard
}