
<script>
  import "../app.css";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  import { Spinner } from 'flowbite-svelte';
  import { textChunk, chunkIdx } from '$lib/store.js';
  import { invalidateAll } from "$app/navigation";
  // import _ from 'lodash'

  let unique = {}

  function onPaste(ev) {
      const copiedText = ev.clipboardData.getData('text/plain');
      let newchunk = copiedText.trim().split('\n')
      let savedTexts = []

      try {
          savedTexts = JSON.parse($textChunk)
      } catch(err) {
          console.log('_PASTE: can_not_parse savedTexts')
          return
      }

      savedTexts.unshift(newchunk)
      textChunk.update(text => {
          text = JSON.stringify(savedTexts)
          return text
      });
      chunkIdx.update(text => {
          text = '0'
          return text
      });
      unique = {}
      goto('/')
      // invalidateAll('/')
  }

  function onKeyDown(ev) {
      if (ev.ctrlKey) {
          switch(ev.key) {
              case 'c':
                  console.log('_COPY')
                  let owordform = document.body.querySelector('.wordform')
                  if (!owordform) return
                  let wf = owordform.textContent
                  console.log('_COPY', wf)
                  copyTextToClipboard(wf)
                  break;
              case 'f':
                  // forms
                  break;
          }
      }
      if (ev.ctrlKey) return

      // let owf = document.querySelector('.wordform')
      // if (!owf) return
      // let wf = owf.textContent

      switch(ev.key) {
          case 'h':
              goto('/')
              break;
          case 'r':
              // showRels()
              break;
          case 'Escape':
              closeAll()
              break;
          case 'w':
              let wiki_host = 'https://en.wiktionary.org/wiki/'
              let wiki_url = [wiki_host, wf].join('')
              window.open(wiki_url, '_blank')
              break;
          case 'p':
              // let owf = document.querySelector('.wordform')
                     // if (!owf) break;
              // wf = owf.textContent
              let pers_host = 'https://www.perseus.tufts.edu/hopper/morph?l='
              let tail = '&la=greek'
              let pers_url = [pers_host, wf, tail].join('')
              window.open(pers_url, '_blank') // .focus();
              break;
          case '_x':
              break;
      }
  }


  async function gotoWF(ev) {
      let owf = ev.target
      if (!owf.classList.contains('wf')) return
      let wf = owf.textContent
      if (!wf) return
      goto(wf)
  }

  function closeAll() {
      let oforms = document.querySelector('#popup-forms')
      // if (oforms && !oforms.classList.contains('hidden')) {
      // oforms.classList.add('hidden')
      // }
      console.log('_CLOSED ALL')
  }

  function copyTextToClipboard(text) {
      navigator.clipboard.writeText(text).then(function() {
          //console.log('_TEXT', text)
      }, function(err) {
          // console.error('Async: Could not copy text: ', err);
      });
  }

  function copyTextFromClipboard(text) {
      navigator.clipboard
          .readText()
          .then(
              // (clipText) => (document.querySelector(".cliptext").innerText = clipText)
              (clipText) => {
                  console.log('_CLIP', clipText)
              }
          )
  }

</script>

<svelte:window on:keydown={onKeyDown} on:paste={onPaste} />
<!-- <svelte:window on:paste={onPaste} /> -->

<div class="h-screen flex flex-col" >

  <Navbar rounded color="form" class="flex " >
    <NavBrand href="/">
      <!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">anthrax 1.1.1</span>
    </NavBrand>
    <!-- <NavHamburger /> -->
    <div class="flex items-center md:order-2" relative>
      <!-- <Avatar id="avatar-menu" src="" /> -->
      <!-- <NavHamburger class1="w-full md:flex md:w-auto md:order-1" /> -->
      <button id="avatar-menu" class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
        <!-- <Spinner size={13} color="pink" absolute top-0 left-0 /> -->
    </div>

    <Dropdown placement="bottom" triggeredBy="#avatar-menu" class="w-full">
      <DropdownHeader>
        <span class="block text-sm "></span>
      </DropdownHeader>
      <DropdownItem href="/">home</DropdownItem>
      <DropdownItem href="/about">about</DropdownItem>
      <DropdownItem>hotkeys</DropdownItem>
      <DropdownItem href="/dicts">dictionaries</DropdownItem>
      <DropdownItem href="/examples">examples</DropdownItem>
      <DropdownItem href="/texts">saved texts</DropdownItem>
    </Dropdown>

  </Navbar>

  <div class="flex-grow flex flex-1_ bg-gray-100 overflow-hidden" on:click={gotoWF}>

    {#key unique}
    <slot />
    {/key}

  </div>


  <Footer class=flex h-10 bg-gray-200 p-4>
    <div class="sm:flex sm:items-center sm:justify-between">
      <FooterCopyright href="/" by="Flowbite™" year={2022} />
      <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <FooterLink href="/">About</FooterLink>
        <FooterLink href="/">Privacy Policy</FooterLink>
        <FooterLink href="/">Licensing</FooterLink>
        <FooterLink href="/">Contact</FooterLink>
      </FooterLinkGroup>
    </div>
  </Footer>


</div>
