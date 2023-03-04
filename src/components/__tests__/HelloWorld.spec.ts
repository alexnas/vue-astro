import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloView from '../../views/HomeView.vue'

describe('HelloView', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloView, { props: { msg: 'Hello World' } })
    expect(wrapper.text()).toContain('Hello World')
  })
})
