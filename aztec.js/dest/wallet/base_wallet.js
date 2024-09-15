/**
 * A base class for Wallet implementations
 */
export class BaseWallet {
    constructor(pxe) {
        this.pxe = pxe;
    }
    getAddress() {
        return this.getCompleteAddress().address;
    }
    getContractInstance(address) {
        return this.pxe.getContractInstance(address);
    }
    getContractClass(id) {
        return this.pxe.getContractClass(id);
    }
    getContractArtifact(id) {
        return this.pxe.getContractArtifact(id);
    }
    addCapsule(capsule) {
        return this.pxe.addCapsule(capsule);
    }
    registerAccount(secretKey, partialAddress) {
        return this.pxe.registerAccount(secretKey, partialAddress);
    }
    rotateNskM(address, secretKey) {
        return this.pxe.rotateNskM(address, secretKey);
    }
    registerRecipient(account) {
        return this.pxe.registerRecipient(account);
    }
    getRegisteredAccounts() {
        return this.pxe.getRegisteredAccounts();
    }
    getRegisteredAccount(address) {
        return this.pxe.getRegisteredAccount(address);
    }
    getRecipients() {
        return this.pxe.getRecipients();
    }
    getRecipient(address) {
        return this.pxe.getRecipient(address);
    }
    registerContract(contract) {
        return this.pxe.registerContract(contract);
    }
    registerContractClass(artifact) {
        return this.pxe.registerContractClass(artifact);
    }
    getContracts() {
        return this.pxe.getContracts();
    }
    proveTx(txRequest, simulatePublic) {
        return this.pxe.proveTx(txRequest, simulatePublic);
    }
    simulateTx(txRequest, simulatePublic, msgSender) {
        return this.pxe.simulateTx(txRequest, simulatePublic, msgSender);
    }
    sendTx(tx) {
        return this.pxe.sendTx(tx);
    }
    getTxEffect(txHash) {
        return this.pxe.getTxEffect(txHash);
    }
    getTxReceipt(txHash) {
        return this.pxe.getTxReceipt(txHash);
    }
    getIncomingNotes(filter) {
        return this.pxe.getIncomingNotes(filter);
    }
    getOutgoingNotes(filter) {
        return this.pxe.getOutgoingNotes(filter);
    }
    // TODO(#4956): Un-expose this
    getNoteNonces(note) {
        return this.pxe.getNoteNonces(note);
    }
    getPublicStorageAt(contract, storageSlot) {
        return this.pxe.getPublicStorageAt(contract, storageSlot);
    }
    addNote(note) {
        return this.pxe.addNote(note);
    }
    addNullifiedNote(note) {
        return this.pxe.addNullifiedNote(note);
    }
    getBlock(number) {
        return this.pxe.getBlock(number);
    }
    simulateUnconstrained(functionName, args, to, from) {
        return this.pxe.simulateUnconstrained(functionName, args, to, from);
    }
    getUnencryptedLogs(filter) {
        return this.pxe.getUnencryptedLogs(filter);
    }
    getBlockNumber() {
        return this.pxe.getBlockNumber();
    }
    getNodeInfo() {
        return this.pxe.getNodeInfo();
    }
    isGlobalStateSynchronized() {
        return this.pxe.isGlobalStateSynchronized();
    }
    isAccountStateSynchronized(account) {
        return this.pxe.isAccountStateSynchronized(account);
    }
    getSyncStatus() {
        return this.pxe.getSyncStatus();
    }
    getSyncStats() {
        return this.pxe.getSyncStats();
    }
    addAuthWitness(authWitness) {
        return this.pxe.addAuthWitness(authWitness);
    }
    getAuthWitness(messageHash) {
        return this.pxe.getAuthWitness(messageHash);
    }
    isContractClassPubliclyRegistered(id) {
        return this.pxe.isContractClassPubliclyRegistered(id);
    }
    isContractPubliclyDeployed(address) {
        return this.pxe.isContractPubliclyDeployed(address);
    }
    getPXEInfo() {
        return this.pxe.getPXEInfo();
    }
    getEvents(type, eventMetadata, from, limit, vpks = [
        this.getCompleteAddress().publicKeys.masterIncomingViewingPublicKey,
        this.getCompleteAddress().publicKeys.masterOutgoingViewingPublicKey,
    ]) {
        return this.pxe.getEvents(type, eventMetadata, from, limit, vpks);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV93YWxsZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FsbGV0L2Jhc2Vfd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFDQTs7R0FFRztBQUNILE1BQU0sT0FBZ0IsVUFBVTtJQUM5QixZQUErQixHQUFRO1FBQVIsUUFBRyxHQUFILEdBQUcsQ0FBSztJQUFHLENBQUM7SUFjM0MsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQzNDLENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxPQUFxQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELGdCQUFnQixDQUFDLEVBQU07UUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxFQUFNO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLE9BQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsZUFBZSxDQUFDLFNBQWEsRUFBRSxjQUE4QjtRQUMzRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsVUFBVSxDQUFDLE9BQXFCLEVBQUUsU0FBYTtRQUM3QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsT0FBd0I7UUFDeEMsT0FBTyxJQUFJLENBQUMsR0FB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