import type { GenericResponse } from "..";

export type LoginResponse = Omit<GenericResponse<null>, 'data'> & { token: string }