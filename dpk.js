import { createHash } from "crypto";

export const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event?.partitionKey;

  if (!candidate) {
    const data = JSON.stringify(event);

    candidate = createHash("sha3-512").update(data).digest("hex");
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate || TRIVIAL_PARTITION_KEY;
};
