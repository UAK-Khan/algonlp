import {Knex} from "knex";
import MetaDataModel from "../../../modules/metaData/MetaDataModel";
import {metadataData} from "../../../misc/data/metadataData";
import MetaDataDao from "../../../modules/metaData/MetaDataDao";

export async function seed(knex: Knex): Promise<void> {
    return knex.transaction(async (trx) => {
        // Deletes ALL existing entries
        await knex(MetaDataModel.TABLE_NAME).del();

        // Inserts seed entries
        await MetaDataDao.insertMany(trx, metadataData);
    });
}
