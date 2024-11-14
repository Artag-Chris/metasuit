import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { MetaMessageResponse } from '..';


export const sendTemplate = async (url: string, payload: any) => {
  try {
    const respuesta = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: MetaMessageResponse = respuesta.data;
    console.log(`Respuesta:`, data.messages[0].message_status);
    if (data.messages[0].message_status === 'accepted') {
      toast.success('Mensaje enviado correctamente!');
    } else {
      toast.error(`Error al enviar el mensaje: ${data.messages[0].message_status}`);
    }
  } catch (error: AxiosError | any) {
    console.error('Error:', error.message.response?.data || error.message);
    toast.error('Error al enviar el mensaje');
  }
};