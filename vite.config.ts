import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:  { allowedHosts: ["d5a3d93938454559272eab281b265ac2.serveo.net"] } 
});
