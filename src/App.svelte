<script lang="ts">
  import { saveAs } from "file-saver"

  import logo from "./assets/ophtus-logo.png"
  import placeholder from "./assets/9arm.jpg"
  import domtoimage from "dom-to-image"

  let title = "Ophtus Post Fan Remake!"
  let description =
    "ไม่ต้องรอแฟนเพจ ชาวเน็ตออกโรงเอง ฟอนต์ใหญ่ทะลุจอ ไม่ต้องจ้องให้เมื่อยตา!"

  let avatar, fileinput, node

  const onFileSelected = (e) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (e) => {
      avatar = e.target.result
    }
  }

  const copy = () => {
    domtoimage
      .toPng(node)
      .then(function (blob) {
        saveAs(blob, "ophtusify.png")
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error)
      })
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Prompt&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="bg-gray-800 min-h-screen grid place-content-center gap-8">
  <h1 class="text-6xl text-white text-center uppercase mb-4">Ophtusify</h1>

  <div bind:this={node} class="bg relative h-[600px] w-[600px] overflow-hidden">
    <div class="relative m-[2.5%] h-[95%] w-[95%] overflow-hidden">
      <div
        class="absolute -top-[15px] -left-[15px] h-[600px] w-[600px] rotate-45 scale-[1.3] overflow-hidden bg-black"
      >
        <div class="absolute h-full w-full -rotate-45">
          <div class="absolute top-20 left-20 right-20 bottom-0">
            <img
              class="object-cover w-full h-full"
              src={avatar || placeholder}
              alt=""
            />
          </div>
        </div>
        <div
          class="bg-gradient absolute left-24 bottom-0 h-1/2 w-full -rotate-45"
        />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0">
      <img src={logo} class="m-8 w-40" alt="" />
    </div>
    <div
      class="absolute h-1/4 bottom-[2.5%] left-[2.5%] right-[2.5%] text-white mx-4"
    >
      <!-- <h1
        class="text-4xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#6215f1] to-[#1b3efa]"
      >
        {title}
      </h1> -->
      <h1 class="text-4xl mb-2 font-bold text-[#6215f1]">
        {title}
      </h1>
      <p class="text-white text-3xl font-medium">
        {description}
      </p>
    </div>
  </div>

  <input
    class="bg-gray-200 font-bold text-[#6215f1] text-xl appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#6215f1]"
    type="text"
    bind:value={title}
  />

  <textarea
    rows="2"
    class="bg-gray-200 text-lg appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6215f1]"
    type="text"
    bind:value={description}
  />

  <div
    class="text-white text-center text-xl border rounded px-2 py-4"
    on:click={() => {
      fileinput.click()
    }}
  >
    เลือกภาพ
  </div>
  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
  <div
    class="text-white text-center text-xl border rounded px-2 py-4"
    on:click={() => {
      copy()
    }}
  >
    ดาวน์โหลด
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

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
