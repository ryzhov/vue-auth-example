import api from '@/service/api';
import config from '@/app.config';

const url = config.art_service_url;

export default  {

    getArtists: () => {
        return api.get(`${url}/artist`);
    },
};
