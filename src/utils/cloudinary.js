import cloudinary from "cloudinary/lib/cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINATY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINATY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINATY_API_SECRET,
});

export async function deleteCloudImage(public_id) {
  const res = await cloudinary.v2.uploader.destroy(public_id);
  console.log(res);
}

export function botonN() {
  console.log("BOTON :");
  console.log(process.env.NEXT_PUBLIC_CLOUDINATY_API_KEY);
  console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
}
