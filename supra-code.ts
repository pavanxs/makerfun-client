import {
    HexString,
    SupraAccount,
    SupraClient,
    BCS,
    TxnBuilderTypes,
  } from "supra-l1-sdk";
  
  // To run this example, install `ts-node` (e.g. `npm install -g ts-node`), enter the directory
  // that contains this file and run `ts-node ./example.ts`.
  
  (async () => {
    // // To Create Instance Of Supra Client.
    // // Note: Here We Need To Pass ChainId, Default ChainId Value Is 3
    // let supraClient = new supraSDK.SupraClient(
    //   "https://rpc-wallet.supra.com/",
    //   3
    // );
  
    // To Create Instance Of Supra Client, But In This Method We Don't Need To Pass ChainId.
    // ChainId Will Be Identified At Instance Creation Time By Making RPC Call.
    let supraClient = await SupraClient.init(
      // "http://localhost:27001/"
      "https://rpc-testnet.supra.com/"
    );
  
    let senderAccount = new SupraAccount(
      Buffer.from(
        "2b9654793a999d1d487dabbd1b8f194156e15281fa1952af121cc97b27578d89",
        "hex"
      )
    );
    console.log("Sender Address: ", senderAccount.address());
  
    // To Check Whether Account Exists
    if ((await supraClient.isAccountExists(senderAccount.address())) == false) {
      console.log(
        "Funding Sender With Faucet: ",
        // To Fund Account With Test Supra Tokens
        await supraClient.fundAccountWithFaucet(senderAccount.address())
      );
    }
  
    let receiverAddress = new HexString(
      // "1000000000000000000000000000000000000000000000000000000000000000"
      "0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80"
    );
    console.log("Receiver: ", receiverAddress);
  
    console.log(
      "Receiver Account Exists: ",
      await supraClient.isAccountExists(receiverAddress)
    );
  
    console.log(
      "Sender Balance Before TX: ",
      // To Get User Account Balance
      await supraClient.getAccountSupraCoinBalance(senderAccount.address())
    );
    if ((await supraClient.isAccountExists(receiverAddress)) == true) {
      console.log(
        "Receiver Balance Before TX: ",
        await supraClient.getAccountSupraCoinBalance(receiverAddress)
      );
    }
  
    // To Transfer Supra Coin From Sender To Receiver
    let txResData = await supraClient.transferSupraCoin(
      senderAccount,
      receiverAddress,
      BigInt(1000),
      {
        enableTransactionWaitAndSimulationArgs: {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        },
      }
    );
    console.log("Transfer SupraCoin TxRes: ", txResData);
  
    // To Get Transaction's Detail Using Transaction Hash
    console.log(
      "Transaction Detail: ",
      await supraClient.getTransactionDetail(
        senderAccount.address(),
        txResData.txHash
      )
    );
  
    let coinType =
      "0x0000000000000000000000000000000000000000000000000000000000000001::supra_coin::SupraCoin";
    // To Fetch coin info
    console.log("Coin Info", await supraClient.getCoinInfo(coinType));
  
    // To get account coin balance
    console.log(
      "Sender Coin Balance Before Tx: ",
      await supraClient.getAccountCoinBalance(senderAccount.address(), coinType)
    );
  
    // To transfer coin
    let supraCoinTransferResData = await supraClient.transferCoin(
      senderAccount,
      receiverAddress,
      BigInt(1000),
      coinType,
      {
        enableTransactionWaitAndSimulationArgs: {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        },
      }
    );
    console.log(supraCoinTransferResData);
  
    console.log(
      "Sender Coin Balance After Tx: ",
      await supraClient.getAccountCoinBalance(senderAccount.address(), coinType)
    );
  
    console.log(
      "Sender Balance After TX: ",
      await supraClient.getAccountSupraCoinBalance(senderAccount.address())
    );
    console.log(
      "Receiver Balance After TX: ",
      await supraClient.getAccountSupraCoinBalance(receiverAddress)
    );
  
    let txData = await supraClient.getTransactionDetail(
      senderAccount.address(),
      supraCoinTransferResData.txHash
    );
    if (txData != null) {
      console.log("Transaction Detail: ", txData.transactionInsights);
    }
  
    // To Get Detail Of Transactions Which Are Sent By Defined Account
    console.log(
      "Sender Account Transactions: ",
      await supraClient.getAccountTransactionsDetail(senderAccount.address())
    );
  
    // To Get Detail Of Transactions Which Are Associated With Defined Account In Coin Change
    console.log(
      "Sender Coin Transactions: ",
      await supraClient.getCoinTransactionsDetail(senderAccount.address())
    );
  
    // To Get Combined Results Of 'getAccountTransactionsDetail' and 'getCoinTransactionsDetail'
    console.log(
      await supraClient.getAccountCompleteTransactionsDetail(
        new HexString(senderAccount.address().toString())
      )
    );
  
    // To create a serialized raw transaction
    let supraCoinTransferSerializedRawTransaction =
      await supraClient.createSerializedRawTxObject(
        senderAccount.address(),
        (
          await supraClient.getAccountInfo(senderAccount.address())
        ).sequence_number,
        "0000000000000000000000000000000000000000000000000000000000000001",
        "supra_account",
        "transfer",
        [],
        [receiverAddress.toUint8Array(), BCS.bcsSerializeUint64(1000)]
      );
  
    // To simulate transaction using serialized raw transaction data
    console.log(
      await supraClient.simulateTxUsingSerializedRawTransaction(
        senderAccount.address(),
        {
          Ed25519: {
            public_key: senderAccount.pubKey().toString(),
            signature: "0x" + "0".repeat(128),
          },
        },
        supraCoinTransferSerializedRawTransaction
      )
    );
  
    // To send serialized transaction
    console.log(
      await supraClient.sendTxUsingSerializedRawTransaction(
        senderAccount,
        supraCoinTransferSerializedRawTransaction,
        {
          enableTransactionSimulation: true,
          enableWaitForTransaction: true,
        }
      )
    );
  
    // To create a raw transaction
    // Note: Process to create a `rawTx` and `serializedRawTx` is almost similar
    let supraCoinTransferRawTransaction = await supraClient.createRawTxObject(
      senderAccount.address(),
      (
        await supraClient.getAccountInfo(senderAccount.address())
      ).sequence_number,
      "0000000000000000000000000000000000000000000000000000000000000001",
      "supra_account",
      "transfer",
      [],
      [receiverAddress.toUint8Array(), BCS.bcsSerializeUint64(10000)]
    );
  
    // To create signed transaction
    let supraCoinTransferSignedTransaction = SupraClient.createSignedTransaction(
      senderAccount,
      supraCoinTransferRawTransaction
    );
  
    // To create transaction hash locally
    console.log(
      SupraClient.deriveTransactionHash(supraCoinTransferSignedTransaction)
    );
  
    // Generating serialized `rawTx` using `rawTx` Object
    // and sending transaction using generated serialized `rawTx`
    let supraCoinTransferRawTransactionSerializer = new BCS.Serializer();
    supraCoinTransferRawTransaction.serialize(
      supraCoinTransferRawTransactionSerializer
    );
    console.log(
      await supraClient.sendTxUsingSerializedRawTransaction(
        senderAccount,
        supraCoinTransferRawTransactionSerializer.getBytes(),
        {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        }
      )
    );
  
    // Complete Sponsor transaction flow
  
    // Transaction sponsor keyPair
    let feePayerAccount = new SupraAccount(
      Buffer.from(
        "2b9654793a999d1d487dabbd1b8f194156e15281fa1952af121cc97b27578d88",
        "hex"
      )
    );
    console.log("FeePayer Address: ", feePayerAccount.address());
  
    if ((await supraClient.isAccountExists(feePayerAccount.address())) == false) {
      console.log(
        "Funding FeePayer Account With Faucet: ",
        await supraClient.fundAccountWithFaucet(feePayerAccount.address())
      );
    }
  
    // Creating RawTransaction for sponsor transaction
    let sponsorTxSupraCoinTransferRawTransaction =
      await supraClient.createRawTxObject(
        senderAccount.address(),
        (
          await supraClient.getAccountInfo(senderAccount.address())
        ).sequence_number,
        "0000000000000000000000000000000000000000000000000000000000000001",
        "supra_account",
        "transfer",
        [],
        [receiverAddress.toUint8Array(), BCS.bcsSerializeUint64(10000)]
      );
  
    // Creating Sponsor Transaction Payload
    let sponsorTransactionPayload = new TxnBuilderTypes.FeePayerRawTransaction(
      sponsorTxSupraCoinTransferRawTransaction,
      [],
      new TxnBuilderTypes.AccountAddress(feePayerAccount.address().toUint8Array())
    );
  
    // Generating sender authenticator
    let sponsorTxSenderAuthenticator = SupraClient.signSupraMultiTransaction(
      senderAccount,
      sponsorTransactionPayload
    );
    // Generating sponsor authenticator
    let feePayerAuthenticator = SupraClient.signSupraMultiTransaction(
      feePayerAccount,
      sponsorTransactionPayload
    );
  
    // Sending sponsor transaction
    console.log(
      await supraClient.sendSponsorTransaction(
        senderAccount.address().toString(),
        feePayerAccount.address().toString(),
        [],
        sponsorTxSupraCoinTransferRawTransaction,
        sponsorTxSenderAuthenticator,
        feePayerAuthenticator,
        [],
        {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        }
      )
    );
  
    // Complete Multi-Agent transaction flow
  
    // Secondary signer1 keyPair
    let secondarySigner1 = new SupraAccount(
      Buffer.from(
        "2b9654793a999d1d487dabbd1b8f194156e15281fa1952af121cc97b27578d87",
        "hex"
      )
    );
    console.log("Secondary Signer1 Address: ", secondarySigner1.address());
  
    if (
      (await supraClient.isAccountExists(secondarySigner1.address())) == false
    ) {
      console.log(
        "Funding Secondary Signer1 Account With Faucet: ",
        await supraClient.fundAccountWithFaucet(secondarySigner1.address())
      );
    }
  
    // Creating RawTransaction for multi-agent RawTransaction
    // Note: The `7452ce103328320893993cb9fc656f680a9ed28b0f429ff2ecbf6834eefab3ad::wrapper` module is deployed on testnet
    let multiAgentRawTransaction = await supraClient.createRawTxObject(
      senderAccount.address(),
      (
        await supraClient.getAccountInfo(senderAccount.address())
      ).sequence_number,
      "7452ce103328320893993cb9fc656f680a9ed28b0f429ff2ecbf6834eefab3ad",
      "wrapper",
      "two_signers",
      [],
      []
    );
  
    // Creating Multi-Agent Transaction Payload
    let multiAgentTransactionPayload =
      new TxnBuilderTypes.MultiAgentRawTransaction(multiAgentRawTransaction, [
        new TxnBuilderTypes.AccountAddress(
          secondarySigner1.address().toUint8Array()
        ),
      ]);
  
    // Generating sender authenticator
    let multiAgentSenderAuthenticator = SupraClient.signSupraMultiTransaction(
      senderAccount,
      multiAgentTransactionPayload
    );
    // Generating Secondary Signer1 authenticator
    let secondarySigner1Authenticator = SupraClient.signSupraMultiTransaction(
      secondarySigner1,
      multiAgentTransactionPayload
    );
  
    // Sending Multi-Agent transaction
    console.log(
      await supraClient.sendMultiAgentTransaction(
        senderAccount.address().toString(),
        [secondarySigner1.address().toString()],
        multiAgentRawTransaction,
        multiAgentSenderAuthenticator,
        [secondarySigner1Authenticator],
        {
          enableWaitForTransaction: true,
          enableTransactionSimulation: true,
        }
      )
    );
  })();


/// example return value of the transaction result
// [
//     {
//       txHash: '0x3d4145985fe8e24ccd70a8eed874f67b2abad9f924abf9a8b44f904f7423fee3',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 537,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1733513973000000,
//       txConfirmationTime: 1733513677604235,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 4483563,
//       blockHash: '0x11617ec65082132c572131187ca545267cf1d70b3f931a2d7dd3070131c4fc28',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xc4bf03f1af29f83d82d250a5df597904cba244e12e3cc3333b323feb28541c69',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 536,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1733513970000000,
//       txConfirmationTime: 1733513670654039,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 4483560,
//       blockHash: '0x1262842e48502e0a4ab6233eb7db6660e9e9927df0626a621ebf8c418cacf3e7',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xd7e0d67261cd7f895fad717be2e4d60e13a1410d2c95114fde0c4861b6f92298',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 535,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1733513961000000,
//       txConfirmationTime: 1733513666120071,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 4483551,
//       blockHash: '0x3548c166bdb620177b36e39458aea96d19fa7f190011576748f9937d86436695',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0x68cee84f8c1151fe85f86fef10fdad114730cb5081ada3449555d34b958b1a15',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 534,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1733513958000000,
//       txConfirmationTime: 1733513658159510,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 4483546,
//       blockHash: '0x134cd2213f0f7c3c077bee0bf6954a69e3ca5d053e3b04a1f9121aa29acd4a39',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0x9e28eda1123c454b9ea53276b65bac84078d8886124108c149705fbb31064e22',
//       sender: '0xb88958a3e9ca911182ca86981ba212831d84ac4f715e8d42d562bfbc5803fa79',
//       sequenceNumber: 8,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 8,
//       transactionCost: 800,
//       txExpirationTimestamp: 1732987779000000,
//       txConfirmationTime: 1732987484002899,
//       status: 'Success',
//       events: [ [Object], [Object], [Object] ],
//       blockNumber: 4058867,
//       blockHash: '0xc5b683d41a48e1cdd6f8a2326677df59aa956ed1d2ff12b962cb902288353444',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xc8c1c56390f6d6208a216072d3cbec42181940dcead39c81f4df049ce28bb48d',
//       sender: '0x9e721e8c6a327c97f00337e62f338c830d9de0196cda051ae82def1fe530c222',
//       sequenceNumber: 0,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732812989000000,
//       txConfirmationTime: 1732812701428136,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3910264,
//       blockHash: '0x401ed5fb728189b200ff21bc32de8bbff7bfb5fb7b82c8842d76cac7d74b582c',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xf516909872b571168bef20707fb13d65425a2af7f685ed6175a722504327a4d3',
//       sender: '0xb88958a3e9ca911182ca86981ba212831d84ac4f715e8d42d562bfbc5803fa79',
//       sequenceNumber: 6,
//       maxGasAmount: 500000,
//       gasUnitPrice: 125,
//       gasUsed: 9,
//       transactionCost: 1125,
//       txExpirationTimestamp: 1732811878000000,
//       txConfirmationTime: 1732811586247472,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3909306,
//       blockHash: '0xf6e7ba3bfd5ca6e50c2d47c6f80330104c9f439b54eb000758a933bab85587bf',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xb0629e08b8656b2d494ac8a5dbd8ec6611182255cfbd1cd1511280d377c2639e',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 533,
//       maxGasAmount: 2000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732805280000000,
//       txConfirmationTime: 1732804984684843,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3903747,
//       blockHash: '0xbf22d18a89d9ace647cefbf56b66eac6067cd6fdba670a19138cf2279b8f9351',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xd30e9782570400eda60abd616b2848f757bd152647b91c414acbb81136ae8112',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 532,
//       maxGasAmount: 10,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732803669000000,
//       txConfirmationTime: 1732803370074247,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3902364,
//       blockHash: '0x4b395ed4e9eab271dcf3c907c5ea8e2125a627c83192d9f840811ff6557844c7',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0x76f346f35bc24df3044df9e158d68f2218ac83e70e4e86a4202eb7a0530e76f2',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 531,
//       maxGasAmount: 10,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732803642000000,
//       txConfirmationTime: 1732803347371384,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3902347,
//       blockHash: '0x0cb61ffb3849a1db9a8adea563b00ad9029f4b3e4af0356f989fc60bcf569990',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0x934d95d8eab68be5eb7177d6f176cb6530de370a3b58772b5c75f3185e384ee8',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 530,
//       maxGasAmount: 10,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732803627000000,
//       txConfirmationTime: 1732803327673187,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3902326,
//       blockHash: '0x17e32cfcc0142f6fc90b0f04d917fefb684a252b8a7d2fc908e516b291c5a83a',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0x3c30508d7db466502364bbabb4cd281d29f3b6d40b30c14eab26ca493ebe2d73',
//       sender: '0xdafb413542a385df5b0daf295ca18ca9cfa8bd7154ab193088edcca4969c823d',
//       sequenceNumber: 0,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732802121000000,
//       txConfirmationTime: 1732801874356456,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3901105,
//       blockHash: '0x7afa09a075d80ca1ae4aebc9eefd77af2dc25016e5080b439540d6752472df06',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xf56db584022f69d34f93e99c6be39c4d8b7c26e9a9ea0d826f553e664c965faf',
//       sender: '0x459b47d2bb696c9d0c28ab5138a6a57f087d76030537857b4195e9befd6a8534',
//       sequenceNumber: 0,
//       maxGasAmount: 500000,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732802070000000,
//       txConfirmationTime: 1732801823737488,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3901077,
//       blockHash: '0x11c1bda6469747cd5eaea829fb2793737427022a722ad9e3970458fb4c7178a6',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xeb1d46a7e817aa0d8fad81bf50f290acec0e3d29fbfcbe0f05dba7e33134ae51',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 529,
//       maxGasAmount: 10,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732802029000000,
//       txConfirmationTime: 1732801735174373,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3900988,
//       blockHash: '0xc6e4e92249a792d9010b989afe0f511d515853af11c4df15d4eeccff7b26ce2a',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     },
//     {
//       txHash: '0xc377c94de3a4cce70935986f58742079558d6e7f179edb1d0765abd2c63a25ce',
//       sender: '0x4ea94f13a574dd37bcbe95df59a7138ea29d17e9e4478f11e1af104ae2982133',
//       sequenceNumber: 528,
//       maxGasAmount: 10,
//       gasUnitPrice: 100,
//       gasUsed: 9,
//       transactionCost: 900,
//       txExpirationTimestamp: 1732801968000000,
//       txConfirmationTime: 1732801672736197,
//       status: 'Success',
//       events: [ [Object], [Object], [Object], [Object], [Object] ],
//       blockNumber: 3900921,
//       blockHash: '0xf6a8750891cefb3a2d5eec3d61e9cd03da497fb4505486c7c042fe4fb97b0aab',
//       transactionInsights: {
//         coinReceiver: '0xb8922417130785087f9c7926e76542531b703693fdc74c9386b65cf4427f4e80',
//         coinChange: [Array],
//         type: 'CoinTransfer'
//       },
//       vm_status: 'Executed successfully'
//     }
//   ]
