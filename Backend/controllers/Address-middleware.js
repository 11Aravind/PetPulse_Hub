import Address from "../models/Address.js"

export const deleteAddress=async(req,res)=>{
    const addressId = req.params.addressId;
    let deleteFlag
    try {
        deleteFlag=await Address.findOneAndDelete(addressId)
    }catch(err)
    {
         res.status(404).json({ message: 'address not something went wrong findOneAndDelete' ,id:addressId});
    }
    if (!deleteFlag) {
        return res.status(404).json({ message: ' address not deleted' ,id:addressId});
    }
    return  res.status(200).json({ message: 'address deleted successfully', deleteFlag });
}