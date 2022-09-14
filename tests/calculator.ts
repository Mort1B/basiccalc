import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Calculator } from "../target/types/calculator";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const calculator = anchor.web3.Keypair.generate();
  const AnchorProvider = program.provider as anchor.AnchorProvider;

  it("creates calculator", async () => {
    // Add your test here.
    await program.rpc.create("New Calculator", {
        accounts: {
            calculator: calculator.publicKey,
            user: AnchorProvider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "New Calculator");
  });

  it("adds two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
        accounts: {
            calculator: calculator.publicKey,
        }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "New Calculator");
  });

  it("subtracts two numbers", async () => {
        await program.rpc.subtract(new anchor.BN(4), new anchor.BN(2), {
        accounts: {
            calculator: calculator.publicKey,
        }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(2)));
    assert.ok(account.greeting === "New Calculator");
    })
it("multiply two numbers", async () => {
    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
        accounts: {
            calculator: calculator.publicKey,
        }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(6)));
    assert.ok(account.greeting === "New Calculator");
})
it("divides two numbers", async () => {
    await program.rpc.divide(new anchor.BN(10), new anchor.BN(3), {
        accounts: {
            calculator: calculator.publicKey,
        }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(3)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "New Calculator");
})
});
