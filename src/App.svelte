<script lang="ts">
  let title = "Ophtus Post Fan Remake!"
  let description =
    "ไม่ต้องรอแฟนเพจ ชาวเน็ตออกโรงเอง ฟอนต์ใหญ่ทะลุจอ ไม่ต้องจ้องให้เมื่อยตา!"
</script>

<main class="bg-gray-800 min-h-screen grid place-content-center">
  <h1 class="text-6xl text-white text-center uppercase">Ophtusify</h1>

  <div class="bg relative h-[600px] w-[600px] overflow-hidden mt-8">
    <div class="relative m-[2.5%] h-[95%] w-[95%] overflow-hidden">
      <div
        class="absolute -top-[15px] -left-[15px] h-[600px] w-[600px] rotate-45 scale-[1.3] overflow-hidden bg-black"
      >
        <img
          src="https://cdn.discordapp.com/attachments/826099394205843533/973791884331847720/Screenshot_210.png"
          class="absolute -rotate-45 -left-[5%] top-[14%]"
          alt=""
        />
        <div
          class="bg-gradient absolute left-24 bottom-0 h-1/2 w-full -rotate-45"
        />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0">
      <img
        src="https://ophtus.com/wp-content/uploads/2020/09/ophtus_built-for-gamers.png"
        class="m-8 w-40"
        alt=""
      />
    </div>
    <div
      class="absolute h-1/4 bottom-[2.5%] left-[2.5%] right-[2.5%] text-white mx-4"
    >
      <h1
        class="text-4xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#6215f1] to-[#1b3efa]"
      >
        {title}
      </h1>
      <p class="text-white text-3xl font-medium">
        {description}
      </p>
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  /* main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  } */

  .bg {
    background: rgb(98, 21, 241);
    background: linear-gradient(113deg, #6215f1 0%, #1b3efa 100%);
  }

  .bg-gradient {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 70%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  main {
    font-family: "Prompt";
  }
</style>
