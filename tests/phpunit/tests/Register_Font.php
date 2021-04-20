<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Google\Web_Stories\Tests;

/**
 * @coversDefaultClass \Google\Web_Stories\Register_Font
 */
class Register_Font extends \WP_UnitTestCase {
	/**
	 * @covers ::get_handle
	 */
	public function test_get_handle() {
		$actual = ( new \Google\Web_Stories\Register_Font() )->get_handle( 'testing' );

		$this->assertSame( 'testing-google-fonts', $actual );
	}

	/**
	 * @covers ::register
	 */
	public function test_register() {
		$register_font = new \Google\Web_Stories\Register_Font();
		$register_font->register( 'testing' );

		$this->assertTrue( wp_style_is( $register_font->get_handle( 'testing' ), 'registered' ) );
	}
}
