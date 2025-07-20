import { apiRequest } from '@/core/api/apiClient';
import { useAuthStore } from '@/auth/stores/authStore';

const loadImage = async (url:string) => {
    const refresh_token = useAuthStore().refreshToken
    const result = await apiRequest<any>({
        key:"MinOS.cargar", 
        params:{path:url, expires_days: 7}, 
        config: {headers: { 'refresh-token': `${refresh_token}` },},
        backend:"python"
    });
    console.log(result.url_firmada)
    //@ts-ignore
    return result.url_firmada
}

export default loadImage;
