<template>
    <svg
      width="36"
      height="34"
      viewBox="0 0 36 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="classes ? classes : ''"
    >
      <g filter="url(#filter0_d_1263_392)">
        <path
          d="M5.25 9.91602V18.416H13.75"
          stroke="#3B7ABF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.75 24.082C30.75 20.7005 29.4067 17.4575 27.0156 15.0664C24.6245 12.6753 21.3815 11.332 18 11.332C14.8623 11.3352 11.8359 12.4953 9.5 14.5904L5.25 18.4154"
          stroke="#3B7ABF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1263_392"
          x="-3"
          y="0"
          width="42"
          height="42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1263_392"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1263_392"
            result="shape"
          />
        </filter>
      </defs>
    </svg>  
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  const {classes} = defineProps(['classes']);

</script>
