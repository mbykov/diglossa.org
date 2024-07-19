
<script>
  import "../app.css";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
  import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';

  import { Spinner } from 'flowbite-svelte';
  import { textChunk, chunkIdx } from '$lib/store.js';
  import { invalidateAll } from "$app/navigation";
  // import _ from 'lodash'

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
   // let oclip = document.querySelector('#clip-results')
   // let ochunk = createChunkEl(currentRows)
   // oclip.replaceChildren()
   // oclip.appendChild(ochunk)
   invalidateAll('/')
 }



</script>

<svelte:window on:paste={onPaste} />

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
      <DropdownItem href="/examples">examples</DropdownItem>
      <DropdownItem href="/texts">my texts</DropdownItem>
    </Dropdown>

  </Navbar>

  <div class="flex-grow flex flex-1_ bg-gray-100 overflow-hidden">

    <slot />

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
