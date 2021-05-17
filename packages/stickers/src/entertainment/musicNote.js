/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import { _x } from '@web-stories-wp/i18n';
import PropTypes from 'prop-types';

const title = _x('Musical Note', 'sticker name', 'web-stories');

function MusicNote({ style }) {
  return (
    <svg
      style={style}
      viewBox="0 0 160 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M108.689 66.0306C108.101 60.5262 105.23 55.8237 100.384 52.4286C90.0206 45.1653 86.8232 37.8009 86.7945 37.7323C86.4648 36.9377 85.6295 36.4898 84.7872 36.6596C83.9484 36.8293 83.3462 37.5697 83.3462 38.4293V88.8714C83.2458 88.7812 83.149 88.6909 83.0487 88.6042C79.5716 85.6642 74.3633 84.5518 68.757 85.5486C58.9138 87.2967 51.207 94.7912 51.207 102.614C51.207 105.847 52.5871 108.794 55.0891 110.911C57.7309 113.146 61.3728 114.324 65.4341 114.324C66.7138 114.324 68.0365 114.204 69.3807 113.966C79.2239 112.218 86.9343 104.724 86.9343 96.9004V58.3194C88.7266 59.8978 91.3147 61.8626 95.0032 64.6292C101.731 69.6748 99.9965 81.2 99.9785 81.312C99.8531 82.0994 100.251 82.8723 100.961 83.2226C101.67 83.573 102.524 83.4104 103.061 82.8289C107.162 78.3792 109.32 71.943 108.689 66.0306ZM68.757 110.408C64.2656 111.207 60.0143 110.358 57.394 108.14C55.6913 106.699 54.7916 104.789 54.7916 102.611C54.7916 96.5934 61.337 90.5329 69.3807 89.1026C70.492 88.904 71.5924 88.8101 72.6534 88.8101C75.8795 88.8101 78.7723 89.7022 80.7474 91.3708C82.45 92.8119 83.3498 94.7225 83.3498 96.9004C83.3462 102.921 76.8044 108.978 68.757 110.408ZM103.689 75.3273C103.323 70.9028 101.85 65.2612 97.1432 61.7325C90.6121 56.835 87.5545 54.4259 86.9307 52.8945V44.6849C89.2284 47.6863 92.8524 51.5509 98.3332 55.3939C102.301 58.1749 104.649 61.9854 105.122 66.417C105.441 69.3787 104.911 72.5029 103.689 75.3273ZM60.4516 0L68.0365 20.858L65.9647 21.6237L48.1207 8.31071L54.5012 25.8567L52.4294 26.6224L44.8444 5.7644L46.9163 4.9987L64.7495 18.2828L58.3797 0.765697L60.4516 0ZM78.844 20.4752C73.9546 20.5944 70.3091 17.2499 70.1801 11.7527C70.0475 6.2231 73.4671 2.73773 78.4174 2.61854C83.4645 2.49574 86.6404 6.04251 86.7443 10.4597C86.7623 11.1604 86.773 11.6046 86.7228 12.2078L72.4384 12.5545C72.7251 16.6178 75.582 18.6765 78.801 18.6007C81.7331 18.5284 83.6831 16.9248 84.2567 14.588L86.5902 14.5302C85.8805 17.8241 83.167 20.3704 78.844 20.4752ZM72.3954 10.745L84.504 10.4525C84.504 6.41452 81.5539 4.45332 78.3672 4.52917C75.2487 4.60141 72.5531 6.70346 72.3954 10.745ZM93.0747 2.95805L95.186 3.7093L94.254 19.3844L103.785 6.76125L105.868 7.50167L105.37 23.3646L114.374 10.5211L116.428 11.2507L105.617 25.8134L103.534 25.073L103.843 9.74819L94.5479 21.8838L92.4366 21.1325L93.0747 2.95805ZM134.842 19.5253L136.308 21.3565L126.924 39.8993L146.89 34.5611L148.377 36.414L131.444 50.1893L130.057 48.4592L143.581 37.4578L125.185 42.377L124.174 41.1165L132.774 24.0725L119.296 35.0343L117.909 33.3042L134.842 19.5253ZM136.925 67.6667L136.258 65.5466L139.143 64.6256C136.753 64.2861 134.985 62.4513 134.215 59.9953C133.035 56.239 134.387 52.5406 139.201 51.0056L148.793 47.9464L149.449 50.0376L140.097 53.0209C136.459 54.1803 135.222 56.7772 136.172 59.8075C137.143 62.8991 139.742 64.4342 143.742 63.1592L152.675 60.3095L153.342 62.4296L136.925 67.6667ZM137.104 77.2632C137.021 73.3227 138.918 70.5164 142.068 70.1624L142.115 72.4487C140.226 72.6798 138.903 74.3593 138.964 77.191C139.014 79.6686 140.369 81.0411 142.011 81.005C146.27 80.9147 143.56 70.5453 150.026 70.4044C152.582 70.3502 154.747 72.7521 154.822 76.4072C154.901 80.1237 152.998 82.6159 149.689 82.8759L149.643 80.651C151.564 80.4813 152.983 79.0221 152.93 76.3855C152.879 74.0668 151.621 72.6293 150.105 72.6618C145.438 72.7593 148.144 82.9734 142.058 83.1973C139.28 83.2551 137.179 80.8533 137.104 77.2632ZM153.751 89.3049L153.388 91.5008L136.401 88.6475L136.763 86.4516L153.751 89.3049ZM158.654 89.6155C159.586 89.7708 160.12 90.6051 159.977 91.4828C159.83 92.3604 159.059 92.9708 158.124 92.8155C157.188 92.6566 156.625 91.8223 156.769 90.9446C156.919 90.0633 157.722 89.4566 158.654 89.6155ZM149.499 105.973C147.904 110.018 144.728 111.792 141.126 111.207L142 108.993C144.495 109.376 146.671 107.989 147.743 105.273C148.99 102.112 147.861 98.6847 143.524 96.951C139.186 95.2137 136.003 96.9185 134.756 100.079C133.684 102.798 134.308 105.269 136.43 106.768L135.555 108.982C132.652 106.966 131.429 103.434 133.025 99.3853C134.817 94.8381 139.276 92.8263 144.348 94.8526C149.42 96.8788 151.295 101.422 149.499 105.973ZM99.552 156L91.967 135.142L94.0389 134.376L111.883 147.689L105.502 130.143L107.574 129.378L115.159 150.236L113.087 151.001L95.2541 137.717L101.624 155.234L99.552 156ZM81.156 135.525C86.0453 135.406 89.6909 138.75 89.8199 144.247C89.9525 149.777 86.5329 153.262 81.5826 153.381C76.5355 153.504 73.3596 149.957 73.2556 145.54C73.2377 144.84 73.227 144.395 73.2772 143.792L87.5616 143.445C87.2749 139.382 84.418 137.323 81.199 137.399C78.2669 137.472 76.3169 139.075 75.7433 141.412L73.4098 141.47C74.1195 138.176 76.8366 135.63 81.156 135.525ZM87.6046 145.259L75.496 145.551C75.496 149.589 78.4461 151.554 81.6328 151.474C84.7549 151.399 87.4505 149.3 87.6046 145.259ZM66.9289 153.046L64.8176 152.294L65.7496 136.619L56.2182 149.242L54.1356 148.502L54.6339 132.639L45.6294 145.482L43.5755 144.753L54.3865 130.19L56.4692 130.931L56.1609 146.255L65.4521 134.12L67.5634 134.871L66.9289 153.046ZM25.1616 136.475L23.6955 134.644L33.0799 116.101L13.1139 121.439L11.6263 119.586L28.5598 105.807L29.947 107.537L16.4225 118.539L34.8184 113.619L35.8293 114.88L27.2299 131.924L40.7043 120.962L42.0915 122.692L25.1616 136.475ZM23.079 88.3369L23.7457 90.457L20.8601 91.378C23.2475 91.7175 25.0182 93.5523 25.7889 96.0083C26.9682 99.7646 25.6169 103.463 20.8028 104.998L11.2105 108.057L10.5545 105.966L19.9067 102.983C23.545 101.823 24.7817 99.2264 23.8317 96.1961C22.8603 93.1045 20.2615 91.5658 16.2612 92.8444L7.32843 95.6905L6.66171 93.5704L23.079 88.3369ZM22.8998 78.7404C22.9822 82.6809 21.086 85.4872 17.9387 85.8412L17.8885 83.5549C19.7776 83.3238 21.0967 81.6407 21.0394 78.8126C20.9856 76.335 19.6342 74.9625 17.9925 74.9986C13.734 75.0889 16.4476 85.4583 9.98101 85.5992C7.42522 85.6534 5.26014 83.2515 5.18487 79.5964C5.10601 75.8799 7.00941 73.3878 10.318 73.1277L10.3646 75.3526C8.44323 75.5223 7.02375 76.9815 7.07751 79.6181C7.1277 81.9368 8.38588 83.3743 9.90215 83.3418C14.5692 83.2407 11.8629 73.0302 17.9459 72.8063C20.7203 72.7449 22.8245 75.1467 22.8998 78.7404ZM1.3458 66.3881C0.413819 66.2328 -0.120281 65.4021 0.0231018 64.5208C0.166484 63.6396 0.940749 63.0328 1.87273 63.1881C2.8083 63.3434 3.37108 64.1813 3.2277 65.059C3.08432 65.9367 2.28137 66.5434 1.3458 66.3881ZM6.25307 66.6951L6.61511 64.4992L23.6023 67.3525L23.2403 69.5484L6.25307 66.6951ZM10.5044 50.0268C12.0995 45.9816 15.2754 44.2082 18.8779 44.7933L18.0033 47.0073C15.5084 46.6245 13.3326 48.0114 12.2608 50.7274C11.0134 53.8878 12.1425 57.3153 16.4798 59.049C20.8171 60.7863 24.0002 59.0851 25.2476 55.9248C26.3194 53.2051 25.6993 50.7347 23.5737 49.2358L24.4483 47.0218C27.3518 49.0371 28.5741 52.5695 26.979 56.6183C25.1867 61.1655 20.7275 63.1772 15.6554 61.151C10.5832 59.1248 8.70849 54.5776 10.5044 50.0268Z"
        fill="#fff"
      />
    </svg>
  );
}

MusicNote.propTypes = {
  style: PropTypes.object,
};

export default {
  aspectRatio: 160 / 156,
  svg: MusicNote,
  title,
};
