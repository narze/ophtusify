<script lang="ts">
  import { saveAs } from "file-saver"
  import { copyImageToClipboard } from 'copy-image-clipboard'

  import logo from "./assets/ophtus-logo.png"
  import placeholder from "./assets/9arm.jpg"
  import domtoimage from "dom-to-image"
  import Kofi from "./lib/Kofi.svelte"
  import Social from "./lib/Social.svelte"

  let title = "Ophtus Post Fan Remake!"
  let description =
    "ไม่ต้องรอแฟนเพจ ชาวเน็ตออกโรงเอง ฟอนต์ใหญ่ทะลุจอ ไม่ต้องจ้องให้เมื่อยตา!"
  let url = "https://ophtusify.narze.live/"

  let default_size = 30

  let avatar, fileinput, node
  let isCopy = false 

  const onFileSelected = (e) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (e) => {
      avatar = e.target.result
    }
  }

  const download = () => {
    domtoimage
      .toPng(node)
      .then(function (blob) {
        saveAs(blob, "ophtusify.png")
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error)
      })
  }

  function Copy() {
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        copyImageToClipboard(img.src)
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error)
      })
      isCopy = !isCopy
      setTimeout(() => {
        isCopy = !isCopy
      }, 5000);
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Prompt&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Kofi name="narze" label="Support Me" />
<Social {url} {title} {description} />

<main
  class="p-12 min-h-screen grid place-content-center gap-4 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100"
>
  <div class="flex flex-col">
    <h1
      class="text-6xl mb-4 font-bold text-transparent text-center uppercase bg-clip-text bg-gradient-to-br from-[#6215f1] to-[#1b3efa]"
    >
      Ophtusify 🕶
    </h1>
  </div>

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
      <p style={`font-size: ${default_size}px;`} class={`text-white font-medium`}>
        {description}
      </p>
    </div>
  </div>

  <input
    class="bg-black font-bold text-[#6215f1] text-center text-xl appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:border-[#6215f1]"
    type="text"
    bind:value={title}
  />

  <textarea
    rows="2"
    class="bg-black font-medium text-center text-lg appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-[#6215f1]"
    type="text"
    bind:value={description}
  />

  <div class="flex flex-row gap-2">
    <button
      class="text-white  text-center text-xl border-2 border-slate-400 rounded px-2 py-4 basis-full bg-gradient-to-r from-[#6215f1] to-[#1b3efa] hover:border-[#6215f1]"
      on:click={() => {
        fileinput.click()
      }}
    >
      เลือกภาพ
    </button>
    <input
      style="display:none"
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileinput}
    />
    <button
      class="text-white text-center text-xl border-2 border-slate-400 rounded px-2 py-4 basis-full bg-gradient-to-r from-[#6215f1] to-[#1b3efa] hover:border-[#6215f1]"
      on:click={() => {
        download()
      }}
    >
      ดาวน์โหลด
    </button>
    <button
      class="text-white text-center text-xl border-2 border-slate-400 rounded px-2 py-4 basis-full bg-gradient-to-r from-[#6215f1] to-[#1b3efa] hover:border-[#6215f1]"
      on:click={Copy}
      >
      {isCopy ? 'Copied' : 'Copy' }
    </button>
  </div>

  <div class="flex flex-row gap-2">
    <button
      class="text-white  text-center text-xl border-2 border-slate-400 rounded px-2 py-4 basis-full bg-gradient-to-r from-[#6215f1] to-[#1b3efa] hover:border-[#6215f1]"
      on:click={() => {
        default_size += 2
      }}
    >
        เพิ่มขนาด
    </button>
    <button
      class="text-white text-center text-xl border-2 border-slate-400 rounded px-2 py-4 basis-full bg-gradient-to-r from-[#6215f1] to-[#1b3efa] hover:border-[#6215f1]"
      on:click={() => {
        default_size -= 2
      }}
    >
        ลดขนาด
    </button>
  </div>
</main>

<!-- Bottom links -->
<div class="fixed inset-x-0 bottom-16 sm:bottom-4 text-center">
  <a
    href="https://github.com/narze/ophtusify"
    target="_blank"
    class="text-white text-sm bg-gradient-to-r from-[#6215f1] to-[#1b3efa] px-2 py-1 rounded-md mx-1"
    >Github</a
  >
  <a
    href="https://www.twitch.tv/videos/1481867740"
    target="_blank"
    class="text-white text-sm bg-gradient-to-r from-[#6215f1] to-[#1b3efa] px-2 py-1 rounded-md mx-1"
    >Live Code @ Twitch (Biblethump)</a
  >
</div>

<style lang="postcss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    @apply bg-gray-800;
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
    font-family: "Prompt", sans-serif;
  }
</style>
