export default class Log {// extends Logger {
    private __log(message: any, context: any, logLevel: number) {
        console.log('  ' + logLevel + ' > ' + message);
    }

    log(message: any, context: any, logLevel: number) {
        
    }
}