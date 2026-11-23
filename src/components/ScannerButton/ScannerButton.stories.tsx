import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ScannerButton } from './ScannerButton';

const meta = {
  title: 'Mobile scanner/ScannerButton',
  component: ScannerButton,
  args: { onClick: fn(), size: 'scanner', variant: 'primary', children: 'ยืนยันการหยิบ' },
} satisfies Meta<typeof ScannerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'ยืนยันการหยิบ' });
    const box = button.getBoundingClientRect();
    await expect(box.height).toBeGreaterThanOrEqual(64);
    await expect(box.width).toBeGreaterThanOrEqual(56);
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const SizeLarge: Story = {
  args: { size: 'lg' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button.getBoundingClientRect().height).toBeGreaterThanOrEqual(56);
  },
};

export const Secondary: Story = { args: { variant: 'secondary', children: 'สแกนช่องเก็บสินค้าอีกครั้ง' } };

export const Danger: Story = { args: { variant: 'danger', children: 'แจ้งสินค้าขาด' } };

export const Disabled: Story = {
  args: { isDisabled: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'กำลังบันทึกตำแหน่งจัดเก็บ' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(getComputedStyle(button).opacity).toBe('1');
  },
};

export const LoadingInForm: Story = {
  args: { isLoading: true, type: 'submit', children: 'กำลังยืนยันการหยิบ' },
  decorators: [(Story) => <form aria-label="ยืนยันการหยิบ" onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).dataset.submitted = 'true'; }}><Story /></form>],
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(canvasElement.querySelector('form')?.dataset.submitted).toBeUndefined();
  },
};

export const LongThaiLabel: Story = {
  args: { children: 'บันทึกตำแหน่งจัดเก็บเข้าพื้นที่สำรองของช่องเก็บสินค้าที่เต็มแล้ว' },
  decorators: [(Story) => <div style={{ inlineSize: '328px' }}><Story /></div>],
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    const label = canvasElement.querySelector('[data-part="label"]') as HTMLElement;
    await expect(label).not.toBeNull();
    // Measure the text's line boxes, not the span: stacked Thai marks must stay inside the label's padding box.
    const range = document.createRange();
    range.selectNodeContents(label);
    const ink = range.getBoundingClientRect();
    const box = label.getBoundingClientRect();
    const outer = button.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(label).paddingBlockStart);
    await expect(pad).toBeGreaterThan(0);
    await expect(ink.top).toBeGreaterThanOrEqual(box.top);
    await expect(ink.bottom).toBeLessThanOrEqual(box.bottom);
    await expect(box.bottom).toBeLessThanOrEqual(outer.bottom);
    await expect(box.right).toBeLessThanOrEqual(outer.right);
  },
};
