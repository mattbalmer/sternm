export type ActionStages = {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
}
export type ActionMap = Record<string, string|ActionStages>;

export const createActionStages = (action: string): ActionStages => ({
  REQUEST: `${action}.REQUEST`,
  SUCCESS: `${action}.SUCCESS`,
  FAILURE: `${action}.FAILURE`,
});
export const createActionKeys = <T extends ActionMap>(prefix: string, input: T): T => {
  return Object.keys(input).reduce((result: T, key: string) => {
    const value = input[key];
    return {
      ...result,
      // @ts-ignore
      [key]: value.REQUEST || value.SUCCESS ? {
        // @ts-ignore
        REQUEST: `${prefix}:${value.REQUEST || value}`,
        // @ts-ignore
        SUCCESS: `${prefix}:${value.SUCCESS || value}`,
        // @ts-ignore
        FAILURE: `${prefix}:${value.FAILURE || value}`,
      } as ActionStages : `${prefix}:${value}`,
    }
  }, {} as T);
};
