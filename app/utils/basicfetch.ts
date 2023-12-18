export default async function basicfetch(url: string) {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(err){
      console.error('There was a problem with the fetch operation:', err);
    }
}