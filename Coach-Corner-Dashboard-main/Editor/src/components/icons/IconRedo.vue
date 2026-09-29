<template>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      :class="classes ? classes : ''"
    >
      <path
        d="M29.75 9.91602V18.416H21.25"
        stroke="#3B7ABF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 24.082C4.25 20.7005 5.5933 17.4575 7.98439 15.0664C10.3755 12.6753 13.6185 11.332 17 11.332C20.1377 11.3352 23.1641 12.4953 25.5 14.5904L29.75 18.4154"
        stroke="#3B7ABF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
</template>

<script>

export default {
  props: ["classes"]
}

</script>
