/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
exports.getBaseURL = function (vm) {
  // var bundleUrl = weex.config.bundleUrl;
//   console.log('-------'+ bundleUrl);
//   if(bundleUrl.lastIndexOf(':') > 4){
//     bundleUrl = bundleUrl.substring(0,bundleUrl.lastIndexOf(':')) + ':8000';
//   }
//   return bundleUrl;
// 	return "http://arodic.github.io/p/jellyfish/";
	// return "//arodic.github.io/p/jellyfish/";
	//return "https://g-assets.daily.taobao.net/gcavans_h5/gcanvas_js/1.1.1/benchmark/jellyfish_h5/"
	return "./tc/sample/jellyfish/";
}
