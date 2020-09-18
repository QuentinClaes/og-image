const contentful = require("contentful");


export async function getImage(ImageLabel: string) {
    const client = contentful.createClient({
        space: "w0han2rpch8u",
        accessToken:
          "ce8fb2651021f7e589b33562cc14964fe5b865f6dfd3569a9948d2aa24d48304",
      });
    const img = client
    .getAssets({
      include: 4,
      query: ImageLabel.replace(/[^\w\s]/gi, "").toString(),
    })
    .then((response: any) => {
      const test = client
        .getAsset(response.items[0].sys.id)
        .then((asset: any) => {
            var url = `https:${asset.fields.file.url}?fm=jpg&w=2OO&h=200`
            
            return  url 
            }   
            )
        .catch((asset: any) => {
          console.log(asset);
        });
        return test
    })
    return img
}