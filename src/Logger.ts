export const LogLevel = {
    Critical:   0,
    Error:      1,
    Warning:    2,
    Info:       3,
    Debug:      4,
    Verbose:    5
};

export interface Logger {
    get logLevel(): number;
    set logLevel(value);
    log(message, context, logLevel): void;
    critical(message, context): void;
    error(message, context): void;
    warn(message, context): void;
    info(message, context): void;
    debug(message, context): void;
    verbose(message, context): void;
}