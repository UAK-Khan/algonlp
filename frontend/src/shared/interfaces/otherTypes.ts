export type TMetaKeys = "email" | "phone" | "location" | "moneySymbol";
export type TMetaFn = (key: TMetaKeys, defaultValue?: string) => string;
