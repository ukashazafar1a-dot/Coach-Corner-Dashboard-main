<template>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="22"
      viewBox="0 0 26 22"
      fill="none"
      class=""
    >
      <path
        d="M1.55698 20.7964L1.2434 21.5H2.01367H6.75653H7.09011L7.2182 21.192L8.87236 17.2143H17.4757L19.1232 21.1914L19.251 21.5H19.5851H24.4422H25.2135L24.8987 20.7959L15.9558 0.795903L15.8235 0.5H15.4994H10.928H10.6034L10.4713 0.796447L1.55698 20.7964ZM13.1824 6.85002L15.6057 12.7H10.7497L13.1824 6.85002Z"
        :fill="fill"
        :stroke="stroke"
      />
    </svg>
</template>

<script>
export default {
props: {
  fill: {
    type: String,
    default(){
      return 'white'
    }
  },
  stroke: {
    type: String,
    default(){
      return '#D2D2D2'
    }
  }
}
}
</script>