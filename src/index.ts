import { BigQuery } from '@google-cloud/bigquery';

async function main() {
  const datasetId = 'bq_sandbox';
  const bq = new BigQuery();

  const [dataset] = await bq.dataset(datasetId).get({ autoCreate: true });
  console.log(`Dataset ${dataset.id} created.`);

  const [table] = await dataset
    .table('bq_sandbox_table_01')
    .get({ autoCreate: true });
  console.log(`Table ${table.id} created.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
