<script>
	import Icon from '@iconify/svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="flex">
	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="form-floating">
			<input
				name="normal-input"
				placeholder=" "
				type="text"
				class="input input-bordered w-full max-w-xs"
			/>
			<label for="normal-input" class="label"> Normal Input </label>
		</div>
	</div>

	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="form-floating">
			<input
				name="disabled-input"
				placeholder=" "
				type="text"
				class="input input-bordered w-full max-w-xs"
				disabled
			/>
			<label for="disabled-input" class="label"> Disabled Input </label>
		</div>
	</div>

	<div class="form-control w-full max-w-xs my-8 mx-4 relative h-full">
		<div class="form-floating">
			<input
				name="large-input"
				placeholder=" "
				type="text"
				class="input input-bordered w-full max-w-xs input-lg"
			/>
			<label for="large-input" class="label"> Large Input </label>
		</div>
	</div>
</div>
<div class="flex">
	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="input-group ">
			<span>Email</span>
			<div class="form-floating">
				<input name="group-input-l" placeholder=" " type="text" class="input input-bordered" />
				<label for="group-input-l" class="label"> Group Input Left </label>
			</div>
		</div>
	</div>

	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="input-group ">
			<div class="form-floating">
				<input name="group-input-r" placeholder=" " type="text" class="input input-bordered" />
				<label for="group-input-r" class="label"> Group Input Right </label>
			</div>
			<span>BTC</span>
		</div>
	</div>

	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="input-group ">
			<span>price</span>
			<div class="form-floating">
				<input name="group-input-m" placeholder=" " type="text" class="input input-bordered" />
				<label for="group-input-m" class="label"> Group Input Middle </label>
			</div>
			<span>USD</span>
		</div>
	</div>
</div>

<div class="flex">
	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="input-group">
			<div class="form-floating">
				<input name="group-input-btn" placeholder=" " type="text" class="input input-bordered" />
				<label for="group-input-btn" class="label"> Search </label>
			</div>
			<button class="btn btn-square">
				<Icon icon="heroicons:magnifying-glass" width="25" />
			</button>
		</div>
	</div>

	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="input-group">
			<div class="form-floating">
				<select name="group-select-btn" class="select select-bordered w-full max-w-xs">
					<option value="" selected disabled hidden>Please select</option>
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
					<option value="3">Option 3</option>
					<option value="4">Option 4</option>
					<option value="5">Option 5</option>
				</select>
				<label for="group-select-btn" class="label"> Pick category </label>
			</div>
			<button class="btn">Go</button>
		</div>
	</div>
	<div class="form-control w-full max-w-xs my-8 mx-4 h-full">
		<div class="form-floating">
			<textarea class="textarea textarea-bordered" placeholder=" " />
			<label for="group-input-btn" class="label"> Bio </label>
		</div>
	</div>
</div>
