const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  let originalCreateHash;

  beforeAll(() => {
    // Mock the createHash function to always return a fixed value
    originalCreateHash = crypto.createHash;
    crypto.createHash = jest.fn(() => ({
      update: jest.fn(),
      digest: jest.fn(() => "mockedHashValue"),
    }));
  });

  afterAll(() => {
    // Restore the original createHash function
    crypto.createHash = originalCreateHash;
  });

  it("should return the provided partition key if it exists", () => {
    const event = { partitionKey: "providedKey" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("providedKey");
  });

  it("should return the hash of the event if partition key is not provided", () => {
    const event = { foo: "bar" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("mockedHashValue");
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
    expect(crypto.createHash().update).toHaveBeenCalledWith(JSON.stringify(event));
    expect(crypto.createHash().digest).toHaveBeenCalledWith("hex");
  });

  it("should return a trivial partition key if the event is not provided", () => {
    const result = deterministicPartitionKey();
    expect(result).toBe("0");
  });

  it("should convert the candidate to a string if it's not already", () => {
    const event = { candidate: 123 };
    const result = deterministicPartitionKey(event);
    expect(result).toBe('123');
  });

  it("should return the hash of the candidate if its length exceeds the maximum", () => {
    const longCandidate = "a".repeat(300);
    const result = deterministicPartitionKey({ partitionKey: longCandidate });
    expect(result).toBe("mockedHashValue");
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
    expect(crypto.createHash().update).toHaveBeenCalledWith(longCandidate);
    expect(crypto.createHash().digest).toHaveBeenCalledWith("hex");
  });
});
