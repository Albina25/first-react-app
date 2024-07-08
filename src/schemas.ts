import { z } from 'zod';

export const TableTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number().optional(),
    //age: z.string().transform((val) => parseInt(val, 10)).optional(),
    address: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

//export const TableTypeContract = z.array(TableTypeSchema);
export type TableType = z.infer<typeof TableTypeSchema>;
