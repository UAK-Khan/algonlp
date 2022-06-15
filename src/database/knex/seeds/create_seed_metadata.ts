import {Knex} from "knex";
import {metadataData} from "../../../misc/data/metadataData";
import MetaDataDao from "../../../modules/metaData/MetaDataDao";

export async function seed(knex: Knex): Promise<void> {
    return knex.transaction(async (trx) => {
        await MetaDataDao.upsertMany(trx, metadataData, ["key"]);
    });
}
