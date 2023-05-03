import {
  create_proof,
  setup_generic_prover_and_verifier,
} from "@noir-lang/barretenberg";
import initializeAztecBackend from "@noir-lang/aztec_backend";

// Type assertion for the initialiseAztecBackend function
// const initialiseAztecBackend = (AztecBackendModule as any)
//   .default as () => Promise<void>;

self.addEventListener("message", (event) => {
  console.log("worker starting to generate proof assets!", event.data);
  (async () => {
    const proof = await generateProof();
    self.postMessage(proof);
  })();
});

async function generateProof() {
  //TODO: find error with vite for initialiseAztecBackend
  await initializeAztecBackend();
  //console.log("backend initialized");

  return Math.random().toString(36);
}
