import { BigQuery } from '@google-cloud/bigquery';

async function main() {
  const datasetName = 'bq-sandbox';
  const bq = new BigQuery();

  const [dataset] = await bq.dataset(datasetName).get({ autoCreate: true });
  console.log(`Dataset ${dataset.id} created.`);
  console.log(dataset);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
