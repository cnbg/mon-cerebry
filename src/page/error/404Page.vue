<template>
  <div class="flex items-center justify-center flex-col gap-5 h-full min-h-32 p-2 text-center">
    <div class="uppercase">{{ $t('page-not-found') }}</div>
    <RouterLink to="/">
      <Button :label="$t('homepage')" icon="pi pi-home" outlined severity="contrast" />
    </RouterLink>
  </div>
</template>
