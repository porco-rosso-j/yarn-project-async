#! /bin/bash
set -euo pipefail
mkdir -p ./fixtures

cp "../../../aztec-packages/noir-projects/noir-contracts/target/benchmarking_contract-Benchmarking.json" ./fixtures/Benchmarking.test.json
cp "../../../aztec-packages/noir-projects/noir-contracts/target/test_contract-Test.json" ./fixtures/Test.test.json
