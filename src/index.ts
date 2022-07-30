import {
  BigQuery,
  DatasetResponse,
  TableResponse,
} from '@google-cloud/bigquery';

async function main() {
  const datasetId = 'bq_sandbox';
  const bq = new BigQuery();

  const [dataset] = (await bq
    .dataset(datasetId)
    .get({ autoCreate: true })) as DatasetResponse;
  console.log(`Dataset ${dataset.id} created.`);

  const [table] = (await dataset
    .table('bq_sandbox_table_01')
    .get({ autoCreate: true })) as TableResponse;
  console.log(`Table ${table.id} created.`);

  const [metadata] = await table.getMetadata();
  await table.setMetadata({
    ...metadata,
    schema: 'name:string,age:integer',
  });
  await table.insert([
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ]);
  console.log(`Rows inserted.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
