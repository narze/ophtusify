<script lang="ts">
  import { saveAs } from "file-saver"
  import { copyImageToClipboard } from "copy-image-clipboard"

  import logo from "./assets/ophtus-logo.png"
  import placeholder from "./assets/9arm.jpg"
  import domtoimage from "dom-to-image"
  import Kofi from "./lib/Kofi.svelte"
  import Social from "./lib/Social.svelte"
  import dragElement from "./lib/dragElement"
  import { onMount } from "svelte"

  let title = "Ophtusify"
  let description =
    "ไม่ต้องรอแฟนเพจ ชาวเน็ตออกโรงเอง ฟอนต์ใหญ่ทะลุจอ ไม่ต้องจ้องให้เมื่อยตา!"
  let url = "https://ophtusify.narze.live/"

  let avatar, fileinput, node, imageWidth, avatarElm

  let descriptionSize = 31
  let isCopy = false
  let saving = false
  let imageZoom = 70

  const onAvatarLoad = () => {
    imageWidth = avatarElm.width
    // console.dir(avatarElm)
  }

  onMount(async () => {
    dragElement(avatarElm)
  })

  const onFileSelected = (e) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (e) => {
      avatar = e.target.result
      setTimeout(() => onAvatarLoad(), 500)
    }
  }

  const download = () => {
    saving = true
    domtoimage
      .toPng(node)
      .then(function (blob) {
        saveAs(blob, `ophtusify-[${title}].png`)
        saving = false
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error)
      })
  }

  function Copy() {
    saving = true
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        let img = new Image()
        img.src = dataUrl
        copyImageToClipboard(img.src)
        saving = false
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error)
      })
    isCopy = !isCopy
    setTimeout(() => {
      isCopy = !isCopy
    }, 5000)
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
              bind:this={avatarElm}
              on:load={() => onAvatarLoad()}
              class="absolute -top-20 left-0 max-w-none h-full cursor-move"
              style="transform: scale({imageZoom /
                100}); left:calc(50% - {imageWidth / 2}px)"
              src={avatar || placeholder}
              alt=""
            />
          </div>
        </div>
        <div
          class="bg-gradient absolute left-24 bottom-0 h-1/2 w-full -rotate-45 pointer-events-none"
        />
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
      <img src={logo} class="m-8 w-40" alt="" />
    </div>
    <div
      class="absolute h-1/4 bottom-[2.5%] left-[2.5%] right-[2.5%] text-white mx-4 "
    >
      <!-- <h1
        class="text-4xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#6215f1] to-[#1b3efa]"
      >
        {title}
      </h1> -->
      <!-- <h1 class="text-4xl mb-2 font-bold text-[#6215f1]">
        {title}
      </h1> -->

      <!-- svelte-ignore a11y-autofocus -->
      <input
        class={`${
          saving
            ? "border-2 border-transparent resize-none"
            : "border-2 border-[#6215f188] rounded-xl"
        } caret-white absolute -top-2 bg-transparent text-4xl font-bold text-[#6215f1] appearance-none rounded w-full leading-tight focus:outline-none focus:border-[#6215f1]`}
        type="text"
        autofocus={true}
        bind:value={title}
      />
      <!-- <p
        style={`font-size: ${descriptionSize}px;`}
        class={`text-white font-medium`}
      >
        {description}
      </p> -->

      <textarea
        rows="2"
        style={`font-size: ${descriptionSize}px;`}
        class={`${
          saving
            ? "border-2 border-transparent resize-none overflow-y-hidden"
            : "border-2 border-[#6215f188] rounded-xl"
        } absolute top-10 bg-transparent appearance-none h-28 rounded w-full text-white leading-tight focus:outline-none focus:border-[#6215f1] overflow-clip"`}
        type="text"
        bind:value={description}
      />
    </div>
  </div>

  <p class="text-white text-center">
    วิธีใช้: แก้ไขคำตามใจชอบ เลื่อนภาพด้วยการคลิกที่ภาพแล้วลาก
  </p>

  <div class="flex gap-8 overflow-hidden text-white items-center">
    <p class="text-xl w-1/3">ขนาดภาพ</p>
    <input
      type="range"
      min="50"
      max="200"
      bind:value={imageZoom}
      class="slider"
    />
  </div>

  <div class="flex gap-8 overflow-hidden text-white items-center">
    <p class="text-xl w-1/3">ขนาดตัวหนังสือ</p>
    <input
      type="range"
      min="20"
      max="80"
      bind:value={descriptionSize}
      class="slider"
    />
  </div>

  <div class="flex flex-row gap-2">
    <button
      class="text-white text-center text-xl border-2 border-slate-400 rounded px-2 py-4 basis-full bg-gradient-to-r from-[#6215f1] to-[#1b3efa] hover:border-[#6215f1]"
      on:click={() => {
        fileinput.click()
      }}
    >
      อัปโหลดภาพ
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
      {isCopy ? "Copied" : "คัดลอก"}
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

  input[type="range"] {
    width: 100%;
    margin: 15px 0;
    background-color: transparent;
    user-select: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background-image: linear-gradient(to right, #9084a7, #6671af);
    border-radius: 8px;
    width: 100%;
    height: 8px;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    margin-top: -15px;
    width: 35px;
    height: 35px;
    background: #eeeeee;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    cursor: pointer;
    -webkit-appearance: none;
    user-select: none;
  }

  /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
  @supports (-ms-ime-align: auto) {
    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
    input[type="range"] {
      margin: 0;
      /*Edge starts the margin from the thumb, not the track as other browsers do*/
    }
  }
</style>
