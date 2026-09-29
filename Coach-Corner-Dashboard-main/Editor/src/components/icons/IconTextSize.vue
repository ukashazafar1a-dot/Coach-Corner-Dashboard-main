<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      :class="classes ? classes : ''"
      :style="{ width: width, height: height }"
    >
      <g clipPath="url(#clip0_1514_827)">
        <path
          d="M0.23 22L9.59 0.999999H14.39L23.78 22H18.68L11 3.46H12.92L5.21 22H0.23ZM4.91 17.5L6.2 13.81H17L18.32 17.5H4.91Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1514_827">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>  
</template>

<script>
export default {
  props: ["height","width","classes"]
}
</script>