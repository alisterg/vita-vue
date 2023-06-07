import { toastController } from "@ionic/vue";

export async function toasty(msg: string) {
  const toast = await toastController.create({
    message: msg,
    duration: 1000,
  });

  await toast.present();
}
