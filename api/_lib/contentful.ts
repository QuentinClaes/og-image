const contentful = require("contentful");


  async function getClient() {
    const client = contentful.createClient({
        space: "w0han2rpch8u",
        accessToken:
          "ce8fb2651021f7e589b33562cc14964fe5b865f6dfd3569a9948d2aa24d48304",
      });

    return client;
}

export async function getImage(ImageLabel: string) {
    const client = await getClient();
    const img = client
    .getAssets({
      include: 4,
      query: ImageLabel.replace(/[^\w\s]/gi, "").toString(),
    })
    .then((response: any) => {
      client
        .getAsset(response.items[0].sys.id)
        .then((asset: any) => {
            var url = `https:${asset.fields.file.url}?f=face&fit=fill&fm=jpg&w=200&h=200`
            return  url 
            }   
            )
        .catch((asset: any) => {
          console.log(asset);
        });
    })
    return img;
}