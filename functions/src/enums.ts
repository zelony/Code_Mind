export enum Status {
    ACCEPTED = "accepted",
    STARTED = "started",
    NOTSTARTED = "not-started",
    REFUSED = "refused",
    PENDING = "pending",
    FINISHED = "finished"
}
export enum VideoStatus {
    ACCEPTED,
    BLOCKED,
    PRIVACYERROR
}
export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    NOT_AUTHENTICATED=401
}
export enum Grades{
    Primary_Preparatory,
    Primary,
    Preparatory,
    SECONDARY,
    ALL,
}
