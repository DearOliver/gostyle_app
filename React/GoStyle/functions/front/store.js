import * as SecureStore from 'expo-secure-store';

export async function save(key, value) {
    const result = await SecureStore.setItemAsync(key, value).then(result => {
        return result
    });
    return result;
}


export function getValueFor(key) {
    console.log("store key", key)
    return SecureStore.getItemAsync(key).then(data => {
        console.log(`getValue for ${key} = ${data}`)
        return data
    });
}

export function removeItem(key) {
     return SecureStore.deleteItemAsync(key).then(r=>{
         console.log("remove item", key)
     })
}

export const isSignedIn = () => {
    return SecureStore.getItemAsync("customer").then(data => {
        return !!data
    });
}
