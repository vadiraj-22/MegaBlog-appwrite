# Implementation Plan

**NOTE**: Bug #1 (duplicate App rendering in main.jsx) appears to already be fixed in the current codebase. The RouterProvider is correctly implemented as `<RouterProvider router={router} />` without duplicate children. Verify this during task 3.1.

## Bug Exploration Tests (Write BEFORE fixing)

- [ ] 1. Write bug condition exploration tests
  - **Property 1: Fault Condition** - Seven Critical React Application Bugs
  - **CRITICAL**: These tests MUST FAIL on unfixed code - failure confirms the bugs exist
  - **DO NOT attempt to fix the tests or the code when they fail**
  - **NOTE**: These tests encode the expected behavior - they will validate the fixes when they pass after implementation
  - **GOAL**: Surface counterexamples that demonstrate each bug exists
  - Test 1.1: Verify duplicate App rendering in main.jsx (line 79)
    - **NOTE**: This bug may already be fixed - verify current state
    - Check if `<RouterProvider router={router} />` is self-closing (correct) or contains `<App />` child (bug)
    - If bug exists: Should detect duplicate rendering
    - If already fixed: Test should pass, confirming correct implementation
  - Test 1.2: Verify conflicting BrowserRouter in App.jsx (line 28)
    - Check that App.jsx wraps content with `<Router>` (BrowserRouter)
    - Expected to FAIL: Should detect conflicting router context
  - Test 1.3: Verify database ID typo in conf.js (line 4)
    - Check that conf exports `appWriteDatbaseId` (missing 'a')
    - Expected to FAIL: Should detect typo causing undefined database ID
  - Test 1.4: Verify infinite loop in AllPosts.jsx (line 11)
    - Check that `appwriteService.getPosts([])` is called outside useEffect
    - Expected to FAIL: Should detect infinite render loop
  - Test 1.5: Verify incorrect React key in AllPosts.jsx (line 20)
    - Check that map uses `key={posts.$id}` (array instead of item)
    - Expected to FAIL: Should detect undefined keys
  - Test 1.6: Verify wrong props in AllPosts.jsx (line 21)
    - Check that Postcard receives `post={post}` instead of destructured props
    - Expected to FAIL: Should detect prop mismatch
  - Test 1.7: Verify unused Home import in components/index.js (line 14)
    - Check that Home is imported but not exported
    - Expected to FAIL: Should detect unused import
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: All tests FAIL (this is correct - proves bugs exist)
  - Document counterexamples found to understand root causes
  - Mark task complete when tests are written, run, and failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

## Preservation Tests (Write BEFORE fixing)

- [ ] 2. Write preservation property tests
  - **Property 2: Preservation** - Verify Non-Buggy Behavior Remains Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy functionality
  - Test 2.1: Verify all routes (/, /login, /signup, /all-posts, /add-post, /edit-post/:slug, /post/:slug) render correctly with Header, Outlet, Footer
  - Test 2.2: Verify authentication state changes dispatch login/logout actions to Redux store
  - Test 2.3: Verify App.jsx calls authService.getCurrentUser() and sets loading state
  - Test 2.4: Verify posts can be fetched and stored in component state (when called correctly)
  - Test 2.5: Verify post card navigation to `/post/${$id}` works with React Router Link
  - Test 2.6: Verify other conf.js values (appWriteUrl, appWriteProjectId, appWriteCollectionId, appWriteBucketId) are correct
  - Test 2.7: Verify all exported components from components/index.js can be imported successfully
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

## Implementation

- [ ] 3. Fix all 7 critical bugs

  - [ ] 3.1 Fix Bug #1: Remove duplicate App rendering in main.jsx
    - **File**: `src/main.jsx`
    - **Line**: 79
    - **Current State**: Already fixed - `<RouterProvider router={router} />` is correct
    - **Verification**: Confirm that line 79 shows `<RouterProvider router={router} />` without `<App />` as a child
    - **Explanation**: App should only render once as the root element in the router configuration (line 20), not as a child inside RouterProvider
    - **Expected State**: `<RouterProvider router={router} />` (self-closing, no children)
    - _Bug_Condition: RouterProvider contains `<App />` as child when App is already root element_
    - _Expected_Behavior: App renders only once as root element in router configuration_
    - _Preservation: All routes continue to render correctly with Header, Outlet, Footer layout_
    - _Requirements: 1.1, 2.1, 3.1_

  - [ ] 3.2 Fix Bug #2: Remove conflicting BrowserRouter in App.jsx
    - **File**: `src/App.jsx`
    - **Step 1 - Remove import (Line 7)**:
      - **Find**:
        ```jsx
        import { BrowserRouter as Router } from 'react-router-dom'
        ```
      - **Replace with**: (delete this line entirely)
    - **Step 2 - Remove opening tag (Line 27)**:
      - **Find**:
        ```jsx
        <Router>
        ```
      - **Replace with**: (delete this line entirely)
    - **Step 3 - Remove closing tag (Line 37)**:
      - **Find**:
        ```jsx
        </Router>
        ```
      - **Replace with**: (delete this line entirely)
    - **Explanation**: Remove BrowserRouter wrapper since RouterProvider in main.jsx already provides routing context. Having both creates conflicting router contexts.
    - **Before**: Two conflicting router contexts (RouterProvider + BrowserRouter)
    - **After**: Single RouterProvider context from main.jsx
    - _Bug_Condition: App.jsx wraps content with BrowserRouter while RouterProvider exists in main.jsx_
    - _Expected_Behavior: App.jsx does not create additional router context_
    - _Preservation: Authentication state changes continue to dispatch correctly to Redux store_
    - _Requirements: 1.2, 2.2, 3.2_

  - [ ] 3.3 Fix Bug #3: Correct database ID typo in conf.js
    - **File**: `src/conf/conf.js`
    - **Line**: 4
    - **Find**:
      ```javascript
      appWriteDatbaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
      ```
    - **Replace with**:
      ```javascript
      appWriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
      ```
    - **Explanation**: Fix typo - change `appWriteDatbaseId` to `appWriteDatabaseId` (add missing 'a' in "Database")
    - **Before**: Property name is `appWriteDatbaseId` (typo), causing undefined when accessed as `appWriteDatabaseId`
    - **After**: Property name is `appWriteDatabaseId` (correct spelling)
    - _Bug_Condition: conf.js exports appWriteDatbaseId (typo) but config.js accesses appWriteDatabaseId_
    - _Expected_Behavior: conf.js exports appWriteDatabaseId with correct spelling_
    - _Preservation: Other configuration values (appWriteUrl, appWriteProjectId, appWriteCollectionId, appWriteBucketId) remain unchanged_
    - _Requirements: 1.3, 2.3, 3.6_

  - [ ] 3.4 Fix Bug #4: Move getPosts inside useEffect in AllPosts.jsx
    - **File**: `src/pages/AllPosts.jsx`
    - **Lines**: 7-14
    - **Find**:
      ```jsx
      useEffect(() => {

      }, [])

      appwriteService.getPosts([]).then((posts) => {
          if(posts){
              setPosts(posts.documents)
          }
      })
      ```
    - **Replace with**:
      ```jsx
      useEffect(() => {
          appwriteService.getPosts([]).then((posts) => {
              if(posts){
                  setPosts(posts.documents)
              }
          })
      }, [])
      ```
    - **Explanation**: Move `appwriteService.getPosts([])` call inside the useEffect hook to prevent infinite render loop. Currently it executes on every render, which triggers setPosts, causing another render.
    - **Before**: getPosts runs on every render → setPosts triggers re-render → infinite loop
    - **After**: getPosts runs once on mount due to empty dependency array []
    - _Bug_Condition: getPosts executes outside useEffect, causing infinite render loop_
    - _Expected_Behavior: getPosts executes inside useEffect with empty dependency array_
    - _Preservation: Posts are still fetched and stored in component state correctly_
    - _Requirements: 1.4, 2.4, 3.4_

  - [ ] 3.5 Fix Bug #5: Correct React key in AllPosts.jsx
    - **File**: `src/pages/AllPosts.jsx`
    - **Line**: 19
    - **Find**:
      ```jsx
                        <div className='p-2 w-1/4' key={posts.$id}>
      ```
    - **Replace with**:
      ```jsx
                        <div className='p-2 w-1/4' key={post.$id}>
      ```
    - **Explanation**: Change `posts.$id` to `post.$id` - use the individual post from map parameter, not the array. The map function parameter is `post`, not `posts`.
    - **Before**: `key={posts.$id}` accesses $id on the array (undefined), all items have same key
    - **After**: `key={post.$id}` accesses $id on individual post item, each item has unique key
    - _Bug_Condition: Map uses posts.$id (array) instead of post.$id (item)_
    - _Expected_Behavior: Each div uses post.$id for unique React keys_
    - _Preservation: Post card navigation to /post/${$id} continues to work correctly_
    - _Requirements: 1.5, 2.5, 3.5_

  - [ ] 3.6 Fix Bug #6: Correct props in AllPosts.jsx
    - **File**: `src/pages/AllPosts.jsx`
    - **Line**: 20
    - **Find**:
      ```jsx
                            <Postcard post={post}/>
      ```
    - **Replace with**:
      ```jsx
                            <Postcard {...post}/>
      ```
    - **Explanation**: Change `post={post}` to `{...post}` to destructure props so Postcard receives $id, title, featuredImage as individual props instead of a single post object.
    - **Before**: Postcard receives single `post` prop, but expects destructured props
    - **After**: Postcard receives destructured props ($id, title, featuredImage)
    - **Alternative fix**: `<Postcard $id={post.$id} title={post.title} featuredImage={post.featuredImage}/>`
    - _Bug_Condition: Postcard receives post={post} but expects destructured props_
    - _Expected_Behavior: Postcard receives destructured props using {...post}_
    - _Preservation: Post cards continue to render and navigate correctly_
    - _Requirements: 1.6, 2.6, 3.5_

  - [ ] 3.7 Fix Bug #7: Remove unused Home import in components/index.js
    - **File**: `src/components/index.js`
    - **Line**: 14
    - **Find**:
      ```javascript
      import Home from "../pages/Home.jsx"
      ```
    - **Replace with**: (delete this line entirely)
    - **Explanation**: Remove unused import - Home is imported but never exported or used
    - **Before**: Home is imported but serves no purpose (not exported)
    - **After**: Unused import removed, cleaner code
    - _Bug_Condition: Home is imported but never exported or used_
    - _Expected_Behavior: Home import is removed_
    - _Preservation: All other component imports/exports continue to work correctly_
    - _Requirements: 1.7, 2.7, 3.7_

  - [ ] 3.8 Verify bug condition exploration tests now pass
    - **Property 1: Expected Behavior** - All Seven Bugs Fixed
    - **IMPORTANT**: Re-run the SAME tests from task 1 - do NOT write new tests
    - The tests from task 1 encode the expected behavior
    - When these tests pass, it confirms the expected behavior is satisfied
    - Run all 7 bug condition exploration tests from step 1
    - **EXPECTED OUTCOME**: All tests PASS (confirms all bugs are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ] 3.9 Verify preservation tests still pass
    - **Property 2: Preservation** - No Regressions Introduced
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run all preservation property tests from step 2
    - **EXPECTED OUTCOME**: All tests PASS (confirms no regressions)
    - Confirm all functionality preserved after fixes

- [ ] 4. Checkpoint - Ensure all tests pass
  - Verify all 7 bugs are fixed
  - Verify no regressions in existing functionality
  - Application should now function correctly with proper routing, database access, and rendering
  - Ask the user if questions arise
